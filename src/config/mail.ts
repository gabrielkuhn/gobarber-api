interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      name: 'Equipe GoBarber',
      email: 'equipe@gobarber.com.br',
    },
  },
} as IMailConfig
