import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './LIstProviderMothAvailabilityService';


let listProviderMOnthAvailability: ListProviderMonthAvailabilityService;
let fakeApoointmentRepositpry: FakeAppointmentRepository;
describe('ListMonthProviderAvailability', () => {

  beforeEach(() => {
    fakeApoointmentRepositpry = new FakeAppointmentRepository();
    listProviderMOnthAvailability = new ListProviderMonthAvailabilityService(
      fakeApoointmentRepositpry
    );
  });

  it('should be able to list the month availability from provider.', async () => {

    await fakeApoointmentRepositpry.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 11, 0 , 0),
    });

    await fakeApoointmentRepositpry.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0 , 0),
    });

    await fakeApoointmentRepositpry.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0 , 0),
    });


    await fakeApoointmentRepositpry.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0 , 0),
    });

    const availability  = listProviderMOnthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, availability: true },
      { day: 20, availability: false },
      { day: 21, availability: false },
      { day: 22, availability: true },
    ]));
  });


});
