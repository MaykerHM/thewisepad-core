import { NoteData, NoteRepository, UserRepository } from '@/use-cases/ports'
import { UpdateNote } from '@/use-cases/update-note'
import { InMemoryNoteRepository, InMemoryUserRepository } from '@test/doubles/repositories'
import { UserBuilder, NoteBuilder } from '@test/builders'

describe('Update note use case', () => {
  test('should update title and content of existing note', async () => {
    const originalNote: NoteData = NoteBuilder.aNote().build()
    const changedNote: NoteData =
      NoteBuilder.aNote().withDifferentTitleAndContent().build()
    const owner = UserBuilder.aUser().build()
    const noteRepositoryWithANote: NoteRepository = new InMemoryNoteRepository([originalNote])
    const userRepositoryWithAUser: UserRepository = new InMemoryUserRepository([
      owner
    ])
    const usecase = new UpdateNote(noteRepositoryWithANote, userRepositoryWithAUser)
    changedNote.id = originalNote.id
    const response = (await usecase.perform(changedNote)).value as NoteData
    expect(response.title).toEqual(changedNote.title)
    expect(response.content).toEqual(changedNote.content)
  })
})
