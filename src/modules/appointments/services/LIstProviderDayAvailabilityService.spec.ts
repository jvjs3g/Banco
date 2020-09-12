import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from './LIstProviderDayAvailabilityService';


let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentRepository;
describe('ListMonthProviderAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

it('should be able to list the day availability from a provider', async () => {


  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 13, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 14, 0, 0),
  });

  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2020, 4, 15, 10, 0, 0 ).getTime();
  });

  const availability = await listProviderDayAvailability.execute({
    provider_id: 'provider_id',
    month: 5,
    year: 2020,
    day: 15,
  });

  expect(availability).toEqual(
    expect.arrayContaining([
      { hour : 8, available: false },
      { hour : 9, available: false },
      { hour : 10, available: false },
      { hour : 11, available: true },
      { hour : 12, available: true },
      { hour : 13, available: false },
      { hour : 14, available: false },

    ]),
  );
});

});
