import moment from 'moment'
import md5 from 'md5'

export const fromNow = (date: string | Date) => moment(date).fromNow()

export const dateFormat = (
  date: string | Date,
  formatter = 'YYYY-MM-DD HH:mm',
) => moment(date).format(formatter)

export const genAvatar = (mail: string = '') =>
  `https://www.gravatar.com/avatar/${md5(mail.toLowerCase())}`
