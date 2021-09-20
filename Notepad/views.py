from rest_framework.decorators import api_view
from rest_framework.response import Response

from Notepad.notes.models import Note
from Notepad.notes.serializers import NoteSerializer
from Notepad.owners.models import Owner
from Notepad.owners.serializers import OwnerSerializer
from Notepad.utils.database_utils import DatabaseUtil

@api_view(['GET'])
def apiOverview(request):
    api = {
        '/login': 'Login into the app with credentials'
    }
    return Response(api)


@api_view(['POST'])
def register(request):
    owner_serializer = OwnerSerializer(data=request.data)
    if owner_serializer.is_valid():
        owner_serializer.save()
    return Response(owner_serializer.data)


@api_view(['POST'])
def add_note(request):
    owner = request.user
    content = request.data.get('content')
    Note(owner=owner, content=content).save()
    notes = Note.objects.filter(owner=owner)
    note_serializer = NoteSerializer(notes, many=True)
    return Response(note_serializer.data)


@api_view(['GET'])
def notes(request):
    owner = request.user
    page = request.query_params.get('page', 1)
    search = request.query_params.get('search', '')
    all_notes = Note.objects.filter(owner=owner).order_by('-last_updated')
    if search:
        all_notes = all_notes.filter(content__icontains=search).order_by('-last_updated')
    default_page_count = DatabaseUtil.get_default_page_count()
    paginated_response = DatabaseUtil.pagination_query(all_notes,
                                                       default_page_count[
                                                           "page_count"],
                                                       page)
    note_serializer = NoteSerializer(paginated_response[0], many=True)
    return Response({
        'notes': note_serializer.data,
        'page_count': paginated_response[2],
        'current_page_number': page,
        'last_page_number': paginated_response[1],
    })


@api_view(['GET'])
def owners(request):
    all_owners = Owner.objects.all()
    serialized_owners = OwnerSerializer(all_owners, many=True)
    return Response(serialized_owners.data)


@api_view(['GET'])
def delete_note(request, note_id):
    owner = request.user
    Note.objects.get(owner=owner, id=note_id).delete()
    all_notes = Note.objects.filter(owner=owner)
    note_serializer = NoteSerializer(all_notes, many=True)
    return Response(note_serializer.data)


@api_view(['POST'])
def update_note(request, note_id):
    owner = request.user
    note = Note.objects.get(owner=owner, id=note_id)
    note_serializer = NoteSerializer(instance=note, data=request.data)
    if note_serializer.is_valid():
        note_serializer.update(note, note_serializer.validated_data)
    else:
        raise Exception('Invalid Content')
    all_notes = Note.objects.filter(owner=owner)
    note_serializer = NoteSerializer(all_notes, many=True)
    return Response(note_serializer.data)
