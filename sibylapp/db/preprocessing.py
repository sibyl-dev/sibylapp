from sibylapp.db import schema
import pandas as pd
import numpy as np
import pickle
import random


def load_model_from_weights_sklearn(weights_filepath, model_base):
    """
    Load the model
    :return: (model, model features)
    """
    model_weights = pd.read_csv(weights_filepath)

    model = model_base
    dummy_X = np.zeros((1, model_weights.shape[1] - 1))
    dummy_y = np.zeros(model_weights.shape[1] - 1)
    model.fit(dummy_X, dummy_y)

    model.coef_ = np.array(model_weights["weight"][1:])
    model.intercept_ = model_weights["weight"][0]
    return model, model_weights["name"][1:]


def load_model_from_pickle(pickle_filepath):
    """
    Load the model
    :return: the model
    """
    model = pickle.load(open(pickle_filepath, 'rb'))

    return model


def insert_features(filepath):
    features_df = pd.read_csv(filepath)

    references = [schema.Category.find_one(name=cat) for cat in features_df['category']]
    features_df.drop('category', axis='columns')
    features_df['category'] = references

    items = features_df.to_dict(orient='records')
    schema.Feature.insert_many(items)


def insert_categories(filepath):
    cat_df = pd.read_csv(filepath)
    items = cat_df.to_dict(orient='records')
    schema.Category.insert_many(items)


def insert_model(model_wrapper, explainer_filepath, importance_filepath, set_doc):
    model_serial = pickle.dumps(model_wrapper)

    name = "Test Model 1"
    description = "A basic lasso regression model.\n " \
                  "Works by multiplying features by weights"
    performance = "98.7% accurate"

    importance_df = pd.read_csv(importance_filepath)
    importance_df = importance_df.set_index("name")
    importances = importance_df.to_dict(orient='dict')["importance"]

    with open(explainer_filepath, "rb") as f:
        explainer = f.read()
    items = {
        "model": model_serial,
        "name": name,
        "description": description,
        "performance": performance,
        "importances": importances,
        "explainer": explainer,
        "training_set": set_doc
    }
    model = schema.Model.insert(**items)
    return model


def insert_entities(values_filepath, transformed=None, features=None,
                    counter_start=0, num=0, include_cases=False):
    # transformed -> {model_id:filepath}
    feature_df = pd.read_csv(values_filepath)
    if features is not None:
        feature_df = feature_df[features + ["eid"]]
    if num > 0:
        feature_df = feature_df.iloc[counter_start:num+counter_start]
    eids = feature_df["eid"]

    cases = schema.Case.find()

    transformed_dfs = {}
    if transformed is not None:
        for model_id in transformed:
            transformed_dfs[model_id] = pd.read_csv(transformed[model_id]).set_index("eid")

    raw_entities = feature_df.to_dict(orient="records")
    entities = []
    for raw_entity in raw_entities:
        eid = raw_entity["eid"]
        entity = {"eid": str(eid)}
        del raw_entity["eid"]
        entity["features"] = raw_entity
        if include_cases:
            entity["property"] = {"case_id": [random.choice(cases).case_id]}
        if transformed is not None:
            entity["transformed_features"] = {}
            for model_id in transformed_dfs:
                transformed_row = transformed_dfs[model_id].loc[eid].to_dict()
                entity["transformed_features"][model_id] = transformed_row
        entities.append(entity)
    schema.Entity.insert_many(entities)
    return eids


def insert_training_set(eids):
    references = [schema.Entity.find_one(eid=str(eid)) for eid in eids]
    training_set = {"entities": references}

    set_doc = schema.TrainingSet.insert(**training_set)
    return set_doc


def insert_cases(filepath):
    case_df = pd.read_csv(filepath)
    items_raw = case_df.to_dict(orient='records')
    items = []
    for item_raw in items_raw:
        item = {"case_id": str(item_raw["case_id"]),
                "property": {"team": item_raw["team"]}}
        items.append(item)
    schema.Case.insert_many(items)


def test_validation():
    pass
