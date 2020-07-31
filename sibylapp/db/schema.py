"""SibylApp Database Schema.

This module contains the classes that define the SibylApp Database Schema:
    * Event
    * Entitiy
    * Category
    * Feature
    * TrainingSet
    * Model
    * Case
"""

import logging

from mongoengine import fields
from mongoengine import ValidationError
from mongoengine import NULLIFY, CASCADE, PULL, DENY
from pip._internal.operations import freeze

from sibylapp.db.base import SibylAppDocument
import pandas as pd

LOGGER = logging.getLogger(__name__)


def _valid_id(val):
    if val is not None and not isinstance(val, str):
        raise ValidationError("eid must be type string, given %s" % val)


def _eid_exists(val):
    if Entity.find_one(eid=val) is None:
        raise ValidationError("eid provided (%s) does not exist" % val)


class Event(SibylAppDocument):
    """Event object.

    A **Event** represents ...
    """
    eid = fields.StringField(required=True, validation=_eid_exists)
    datetime = fields.DateTimeField(required=True)
    # TODO: choices from config
    type = fields.StringField(required=True)
    property = fields.DictField()  # {property:value}


class Entity(SibylAppDocument):
    """Entity object.

    A **Entity** represents ...
    """
    eid = fields.StringField(validation=_valid_id)

    features = fields.DictField()  # {feature:value}
    transformed_features = fields.DictField() # {model_id:{feature:value,},}

    property = fields.DictField()  # {property:value}

    outcome = fields.ListField(
        fields.ReferenceField(Event, reverse_delete_rule=PULL))

    unique_key_fields = ['eid']

    def get_features(self, model_id=None):
        """
        Return features transformed for model with id=model_id
        :param model_id: id of model to get features for
        :return: transformed features for model_id, or base features if not
                 applicable
        """
        if model_id is None or \
           model_id not in self.transformed_features or \
           self.transformed_features[model_id] is None:
            return self.features
        else:
            return self.transformed_features[model_id]

    def to_dataframe(self, model_id=None):
        return pd.DataFrame(self.get_features(model_id), index=[0])


class Category(SibylAppDocument):
    name = fields.StringField(required=True)
    color = fields.StringField()


class Feature(SibylAppDocument):
    """Feature object.

    A **Feature** represents ...
    """
    name = fields.StringField(required=True)
    description = fields.StringField()
    category = fields.ReferenceField(Category, reverse_delete_rule=NULLIFY)
    type = fields.StringField(choices=['binary', 'categorical', 'numeric'])

    unique_key_fields = ['name']


class TrainingSet(SibylAppDocument):
    """Dataset object.

    A **Dataset** represents ...
    """
    entities = fields.ListField(
        fields.ReferenceField(Entity, reverse_delete_rule=PULL))
    neighbors = fields.BinaryField()  # trained NN classifier

    def to_dataframe(self, model_id=None):
        features = [entity.get_features(model_id) for entity in self.entities]
        training_set_df = pd.DataFrame(features)
        return training_set_df


class Model(SibylAppDocument):
    """Model object.

    A **Model** represents ...
    """
    model = fields.BinaryField(required=True)  # the model (must have model.predict())

    name = fields.StringField()
    description = fields.StringField()
    performance = fields.StringField()
    importances = fields.DictField()  # {feature_name:importance}

    explainer = fields.BinaryField()  # trained contribution explainer
    training_set = fields.ReferenceField(TrainingSet, reverse_delete_rule=DENY)


class Case(SibylAppDocument):
    """Case object.

    A **Case** represents ...
    """
    case_id = fields.StringField(required=True, validation=_valid_id)
    property = fields.DictField()
