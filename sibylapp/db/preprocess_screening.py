from pymongo import MongoClient
from mongoengine import connect
from sklearn.linear_model import Lasso
from sibylapp.db.utils import ModelWrapperThresholds
import os
import pandas as pd

import sibylapp.db.preprocessing as helpers

if __name__ == "__main__":
    # GENERAL CONFIGURATIONS
    db_name = 'sibylapp_test'
    directory = "data"

    client = MongoClient("localhost", 27017)
    connect(db_name, host='localhost', port=27017)

    # INSERT CASES:
    case_filepath = "cases.csv"
    helpers.insert_cases(os.path.join(directory, case_filepath))

    # INSERT BASE ENTITIES
    entity_filename = "entity_features.csv"
    model_weights = pd.read_csv(os.path.join(directory, "weights.csv"))
    features = model_weights["name"][model_weights["name"] != "(Intercept)"].tolist()
    eids = helpers.insert_entities(os.path.join(directory, entity_filename),
                                   features, include_cases=True)

    # INSERT DATASET
    dataset_filename = "dataset.csv"
    number_from_dataset = 0
    if number_from_dataset > 0 and dataset_filename is not None:
        eids = helpers.insert_entities(os.path.join(directory, dataset_filename),
                                       features, counter_start=17, num=number_from_dataset)

    # INSERT TRAINING SET
    set_doc = helpers.insert_training_set(eids)

    # INSERT CATEGORIES
    category_filename = "categories.csv"
    helpers.insert_categories(os.path.join(directory, category_filename))

    # INSERT FEATURES
    features_filename = "features.csv"
    helpers.insert_features(os.path.join(directory, features_filename))

    # INSERT MODEL
    model_filename = "weights.csv"
    explainer_filename = "explainer"
    importance_filename = "importances.csv"
    thresholds = [0.01174609, 0.01857239, 0.0241622, 0.0293587,
                  0.03448975, 0.0396932, 0.04531139, 0.051446,
                  0.05834176, 0.06616039, 0.07549515, 0.08624243,
                  0.09912388, 0.11433409, 0.13370343, 0.15944484,
                  0.19579651, 0.25432879, 0.36464856, 1.0]
    base_model, features = helpers.load_model_from_weights_sklearn(
        os.path.join(directory, model_filename), Lasso())
    model = ModelWrapperThresholds(base_model, thresholds, features=features)

    helpers.insert_model(model, os.path.join(directory, explainer_filename),
                 os.path.join(directory, importance_filename), set_doc)
