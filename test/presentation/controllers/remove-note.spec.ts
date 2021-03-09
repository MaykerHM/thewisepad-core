import { HttpRequest, HttpResponse, WebController } from '@/presentation/controllers/ports'
import { RemoveNoteController } from '@/presentation/controllers/remove-note'
import { NoteRepository } from '@/use-cases/ports'
import { RemoveNote } from '@/use-cases/remove-note'
import { NoteBuilder } from '@test/builders'
import { InMemoryNoteRepository } from '@test/doubles/repositories'

describe('Remove note controller', () => {
  test('should return 200 if successfully removing a note', async () => {
    const aNote = NoteBuilder.aNote().build()
    const noteRepositoryWithANote: NoteRepository = new InMemoryNoteRepository([aNote])
    const usecase = new RemoveNote(noteRepositoryWithANote)
    const controller: WebController = new RemoveNoteController(usecase)
    const response: HttpResponse = await controller.handle({
      body: {
        noteId: aNote.id
      }
    })
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(aNote)
  })

  test('should return 400 on attemp to remove unexisting note', async () => {
    const aNote = NoteBuilder.aNote().build()
    const anotherNote = NoteBuilder.aNote().withDifferentTitleAndId().build()
    const noteRepositoryWithANote: NoteRepository = new InMemoryNoteRepository([aNote])
    const usecase = new RemoveNote(noteRepositoryWithANote)
    const controller: WebController = new RemoveNoteController(usecase)
    const response: HttpResponse = await controller.handle({
      body: {
        noteId: anotherNote.id
      }
    })
    expect(response.statusCode).toEqual(400)
  })

  test('should return 400 if request does not contain note id', async () => {
    const aNote = NoteBuilder.aNote().build()
    const noteRepositoryWithANote: NoteRepository = new InMemoryNoteRepository([aNote])
    const usecase = new RemoveNote(noteRepositoryWithANote)
    const controller: WebController = new RemoveNoteController(usecase)
    const invalidRequest: HttpRequest = {
      body: {
      }
    }
    const response: HttpResponse = await controller.handle(invalidRequest)
    expect(response.statusCode).toEqual(400)
  })
})
