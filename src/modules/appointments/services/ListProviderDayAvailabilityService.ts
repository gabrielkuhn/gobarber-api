import { getHours } from 'date-fns'
import { inject, injectable } from 'tsyringe'
// import { getDate, getDaysInMonth } from 'date-fns'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        day,
        month,
        provider_id,
        year,
      },
    )

    const hourStart = 8

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    )

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      )

      return {
        hour,
        available: !hasAppointmentInHour,
      }
    })

    return availability
  }
}

export default ListProviderMonthAvailabilityService
