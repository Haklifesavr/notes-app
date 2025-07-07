from rest_framework import generics, status
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    """
    GET: List all notes
    POST: Create a new note
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Retrieve a specific note
    PUT: Update a note
    DELETE: Delete a note
    """
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
