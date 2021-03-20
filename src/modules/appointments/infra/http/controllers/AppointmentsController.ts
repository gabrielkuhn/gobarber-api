import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService'
import { parseISO } from 'date-fns'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body
    const user_id = request.user.id

    const parsedDate = parseISO(date)

    const createAppointment = container.resolve(CreateAppointmentsService)

    const appointment = await createAppointment.execute({
      date: parsedDate,
      user_id,
      provider_id,
    })

    return response.json(appointment)
  }
}
