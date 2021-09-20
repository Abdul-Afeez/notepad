from django.contrib.auth.hashers import make_password
from rest_framework import serializers

from Notepad.notes.models import Note
from Notepad.owners.models import Owner


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'content', 'last_updated']
    def create(self, validated_data):
        return Note(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance