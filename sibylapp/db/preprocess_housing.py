from pymongo import MongoClient
from mongoengine import connect
import os
from sibylapp.db.utils import ModelWrapperScale
import os
import pandas as pd

import sibylapp.db.preprocessing as helpers

if __name__ == "__main__":
    # GENERAL CONFIGURATIONS
    db_name = 'housing'
    directory = "housing_data"

    client = MongoClient("localhost", 27017)
    connect(db_name, host='localhost', port=27017)

    # INSERT BASE ENTITIES
    entity_filename = "entity_features.csv"
    eids = helpers.insert_entities(os.path.join(directory, entity_filename),
                                   include_cases=False)

    # INSERT TRAINING SET
    set_doc = helpers.insert_training_set(eids)

    # INSERT CATEGORIES
    category_filename = "categories.csv"
    helpers.insert_categories(os.path.join(directory, category_filename))

    # INSERT FEATURES
    features_filename = "features.csv"
    helpers.insert_features(os.path.join(directory, features_filename))

    # INSERT MODEL
    model_filename = "model_ridge"
    scaler_filename = "model_ridge_stdsc.csv"
    explainer_filename = "explainer"
    importance_filename = "importances.csv"

    features = pd.read_csv(os.path.join(directory, features_filename))["name"]
    base_model = helpers.load_model_from_pickle(
        os.path.join(directory, model_filename))

    scaler = pd.read_csv(os.path.join(directory, scaler_filename))
    model = ModelWrapperScale(base_model, scaler, features)

    helpers.insert_model(model, os.path.join(directory, explainer_filename),
                 os.path.join(directory, importance_filename), set_doc)
