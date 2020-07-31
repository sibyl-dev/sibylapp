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

    # INSERT CATEGORIES
    category_filename = "categories.csv"
    helpers.insert_categories(os.path.join(directory, category_filename))

    # INSERT FEATURES
    features_filename = "features.csv"
    helpers.insert_features(os.path.join(directory, features_filename))

    # INSERT MODEL
    thresholds = [88000, 106500, 115000, 124000, 130000, 135948,
                  141000, 147000, 155000, 163900, 172795.75, 179665,
                  188000, 200000, 214600, 230400, 250685, 279800, 328765, 1000000]
    model_filename = "model_ridge"
    scaler_filename = "model_ridge_stdsc.csv"
    explainer_filename = "explainer"
    importance_filename = "importances.csv"

    features = pd.read_csv(os.path.join(directory, features_filename))["name"]
    base_model = helpers.load_model_from_pickle(
        os.path.join(directory, model_filename))

    scaler = pd.read_csv(os.path.join(directory, scaler_filename))
    model = ModelWrapperScale(base_model, scaler, features, thresholds=thresholds)

    model_doc = helpers.insert_model(model, os.path.join(directory, explainer_filename),
                 os.path.join(directory, importance_filename), set_doc=None)

    # INSERT BASE ENTITIES
    entity_filename = "entities.csv"
    readable_entities = "readable_entities.csv"
    eids = helpers.insert_entities(os.path.join(directory, readable_entities),
                                   {str(model_doc.id): os.path.join(directory, entity_filename)},
                                   include_cases=False)

    # INSERT TRAINING SET
    set_doc = helpers.insert_training_set(eids)

    model_doc.training_set = set_doc
    model_doc.save()

