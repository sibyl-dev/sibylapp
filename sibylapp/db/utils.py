import logging
import pickle
from calendar import monthrange
from datetime import datetime, timezone
import pandas as pd
from abc import ABC, abstractmethod

import numpy as np
from pymongo import MongoClient

from sibylapp.db import schema

LOGGER = logging.getLogger(__name__)


def to_probs(arr):
    odds = np.exp(arr)
    return odds / (1 + odds)


def preds_to_scores(preds, thresholds):
    return threshold(to_probs(preds), thresholds)


def threshold(preds, thresholds):
    return np.digitize(preds, thresholds, right=True)+1


class ModelWrapper(ABC):
    def __init__(self, features=None):
        """
        Initialize model wrapper.
        :param features: Features the model uses, in the order it expects them
        """
        self.features = features

    @abstractmethod
    def predict(self, x):
        """
        Makes a prediction on x
        :param x: dataframe of shape (n_entities, n_features)
                  Data to predict on. Column names should be feature names
        :return: list of size (n_entities, )
                 Prediction for entities
        """
        if self.features is not None:
            x = x[self.features]
        return x


class ModelWrapperScale(ModelWrapper):
    def __init__(self, base_model, scaler, features=None, thresholds=None):
        """
        Initialize model wrapper.
        :param base_model: base model with which to predict
        :param scaler: scaler for model, should have a scaler.transform(x)
                      function
        :param features: Features the model uses, in the order it expects them
        """
        self.base_model = base_model
        self.mean = scaler["mean"].to_numpy()
        self.std = scaler["std"].to_numpy()
        self.thresholds = thresholds
        super().__init__(features)

    def predict(self, x):
        """
        Transform and predict on x
        :param x: dataframe of shape (n_entities, n_features)
                  Data to predict on. Column names should be feature names
        :return: list of size (n_entities, )
                 Prediction for entities
        """
        x = super().predict(x)
        x_std = (x-self.mean)/self.std
        price = np.expm1(self.base_model.predict(x_std))
        if self.thresholds is None:
            return price
        return threshold(price, self.thresholds).tolist()


class ModelWrapperThresholds(ModelWrapper):
    def __init__(self, base_model, thresholds, features=None):
        """
        Initialize the model wrapper
        :param base_model: base model with which to predict.
               Should have a base_model.predict() function
        :param thresholds: thresholds to use for scoring
        :param features: Features the model uses, in the order it expects them
        """
        self.base_model = base_model
        self.thresholds = thresholds
        super().__init__(features)

    def predict(self, x):
        """
        Predict on x, then convert to probabilities and scores based on
        thresholds
        :param x: dataframe of shape (n_entities, n_features)
                  Data to predict on. Column names should be feature names
        :return: list of size (n_entities, )
                 Prediction for entities
        """
        x = super().predict(x)
        pred = self.base_model.predict(x)
        scores = preds_to_scores(pred, self.thresholds).tolist()
        return scores


def merge_databases():
    pass


def delete_datasets():
    cli = MongoClient('localhost', port=27017)
    db = cli['mtv']
    pass


def prune_dataruns():
    cli = MongoClient('localhost', port=27017)
    pass


def main():
    pass
