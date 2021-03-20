import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    )
  })

  it('should be able to list the the month availability from the provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 8, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 9, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 10, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 11, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 12, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 13, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 14, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 15, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 16, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 20, 17, 0, 0),
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 4, 21, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailability.execute({
      month: 5,
      year: 2021,
      provider_id: 'user',
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
      ]),
    )
  })
})
