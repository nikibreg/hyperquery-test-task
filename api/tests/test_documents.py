import unittest
import json
from . import BaseTestCase

class TestDocuments(BaseTestCase):
    def test_create_document_success(self):
        post_data = {
            'title': 'My super cool document',
            'body': 'Markdown city',
        }
        result = self.app.post('/v1/documents', json=post_data)

        self.assertEqual(result.status_code, 201)

    def test_create_document_should_have_ordinal_number(self):
        self.app.delete('/v1/documents/all')
        post_data = {
            'title': 'My super cool document',
            'body': 'Markdown city',
        }
        result = self.app.post('/v1/documents', json=post_data)
        print(result.get_json())
        self.assertEqual(result.get_json()['data']['ordinal_number'], 1000)

    def test_retrieve_documents_collection_success(self):
        result = self.app.get('/v1/documents')

        self.assertEqual(result.status_code, 200)

    def test_update_document_not_found(self):
        patch_data = {
            'body': 'Markdown town'
        }
        result = self.app.patch('/v1/documents/deadbeef-dead-dead-dead-deaddeafbeef', json=patch_data)

        self.assertEqual(result.status_code, 404)

    def test_delete_document_not_found(self):
        result = self.app.delete('/v1/documents/deadbeef-dead-dead-dead-deaddeafbeef')

        self.assertEqual(result.status_code, 404)

    def test_delete_document_success(self):
        self.app.delete('/v1/documents/all')
        post_data = {
            'title': 'My super cool document',
            'body': 'Markdown city',
        }
        result = self.app.post('/v1/documents', json=post_data)

        new_document_id = result.get_json()['data']['id']

        self.assertEqual(result.status_code, 201)

        result = self.app.delete(f'/v1/documents/{new_document_id}')

        self.assertEqual(result.status_code, 200)

        result = self.app.get('/v1/documents')

        self.assertEqual(len(result.get_json()['data']), 0)

    def test_when_placing_after_document_ordinal_numbers_should_be_a_mean_of_previous_and_next(self):
        self.app.delete('/v1/documents/all')
        post_data = {
            'title': 'My super cool document',
            'body': 'Markdown city',
        }
        result1 = self.app.post('/v1/documents', json=post_data)
        result2 = self.app.post('/v1/documents', json=post_data)
        result3 = self.app.post('/v1/documents', json=post_data)

        new_document1 = result1.get_json()['data']
        new_document2 = result2.get_json()['data']
        new_document3 = result3.get_json()['data']

        self.assertEqual(result1.status_code, 201)
        self.assertEqual(result2.status_code, 201)
        self.assertEqual(result3.status_code, 201)

        self.assertEqual(new_document1['ordinal_number'], 1000)
        self.assertEqual(new_document2['ordinal_number'], 2000)
        self.assertEqual(new_document3['ordinal_number'], 3000)

        patch_data = {
            'ordinal_previous_id': new_document1['id']
        }
        result4 = self.app.patch('/v1/documents/' + new_document3['id'], json=patch_data)
        self.assertEqual(result4.get_json()['data']['ordinal_number'], 1500)

    def test_when_the_previous_ordinal_number_is_set_but_null_the_document_should_be_placed_at_start(self):
        self.app.delete('/v1/documents/all')
        post_data = {
            'title': 'My super cool document',
            'body': 'Markdown city',
        }
        result = self.app.post('/v1/documents', json=post_data)
        new_document1 = result.get_json()['data']
        result = self.app.post('/v1/documents', json=post_data)
        new_document2 = result.get_json()['data']
        result = self.app.post('/v1/documents', json=post_data)
        new_document3 = result.get_json()['data']
    
        self.assertEqual(new_document1['ordinal_number'], 1000)
        self.assertEqual(new_document2['ordinal_number'], 2000)
        self.assertEqual(new_document3['ordinal_number'], 3000)

        patch_data = {
            'ordinal_previous_id': None
        }
        result = self.app.patch('/v1/documents/' + new_document3['id'], json=patch_data)
        self.assertEqual(result.get_json()['data']['ordinal_number'], 1000)