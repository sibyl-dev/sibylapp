#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""Tests for `sibylapp` package."""


def test_get_entities(client, entities):
    response = client.get('/api/v1/entities/').json

    assert len(response["entities"]) == len(entities)

    for expected_item in entities:
        found = False
        for response_item in response["entities"]:
            if response_item["eid"] == expected_item["eid"]:
                found = True
                if "property" in expected_item:
                    assert response_item["property"] == expected_item["property"]
                else:
                    assert len(response_item["property"]) == 0
        assert found


def test_get_entity(client, entities):
    entity = entities[0]
    response = client.get('/api/v1/entities/' + entity["eid"] + "/").json
    assert response["eid"] == entity["eid"]
    assert response["features"] == entity["features"]
    assert response["property"] == entity["property"]
    assert len(response) == 3


def test_get_events(client, entities):
    entity = entities[0]
    response = client.get('/api/v1/events/?eid=' + entity["eid"]).json

    assert len(response["events"]) == len(entity["events"])

    for expected_item in entity["events"]:
        found = False
        for response_item in response["events"]:
            if response_item["event_id"] == expected_item["event_id"]:
                found = True
                if "property" in expected_item:
                    assert response_item["property"] == expected_item["property"]
                else:
                    assert len(response_item["property"]) == 0
                if "type" in expected_item:
                    assert response_item["type"] == expected_item["type"]
                else:
                    assert response_item["type"] is None
                if "datetime" in expected_item:
                    assert response_item["datetime"] == str(expected_item["datetime"])
                else:
                    assert response_item["datetime"] is None
        assert found


def test_get_referrals(client, referrals):
    response = client.get('/api/v1/referrals/').json
    assert response["referrals"] == [referral["referral_id"] for referral in referrals]


def test_get_referral(client, referrals):
    referral = referrals[0]
    response = client.get('/api/v1/referrals/' + referral["referral_id"] + "/").json
    assert response == referral


def test_entities_in_referral(client):
    referral_id = "101"
    entities_involved = ["ent1", "ent2"]
    response = client.get('/api/v1/entities_in_referral/' + referral_id + "/").json
    assert response == entities_involved
