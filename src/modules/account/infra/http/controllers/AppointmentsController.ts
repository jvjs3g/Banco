import { Request, Response } from 'express';
import {  parseISO } from 'date-fns'
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/account/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request ,response: Response ): Promise<Response>{


    const { cpf } = request.body;

    const createAppointment =  container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({cpf});

    return response.json(appointment);
  }
}
