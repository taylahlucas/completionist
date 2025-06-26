import { AxiosErrorResponse, LoggerType } from '../custom-types';

interface LoggerProps {
  type?: LoggerType;
  title: string;
  data?: any;
}

export const log = ({ type = 'info', title, data }: LoggerProps) => {
  if (__DEV__) {
    console.log(
      `\n[${type.toLocaleUpperCase()}]: `,
      title,
      data ? `\n[DATA]: ${JSON.stringify(data, null, 2)} \n` : '\n',
    );
  }
};

export const logSuccessfulApi = ({ title, data }: LoggerProps) =>
  log({
    type: 'info',
    title,
    data: {
      code: 200,
      message: 'Successful api call',
      ...data,
    },
  });

export const logErrorApi = ({ title, data }: LoggerProps) =>
  log({
    type: 'error',
    title,
    data,
  });

export const logErrorData = (error: AxiosErrorResponse) => ({
  code: error.code,
  message: error.message,
  response: error?.response?.data.error,
});
