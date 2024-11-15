import { AxiosErrorResponse, LoggerType } from "../CustomTypes";

interface LoggerProps {
  type?: LoggerType;
  title: string;
  data?: any;
}

const useLogger = () => {
  const log = ({ type = 'info', title, data }: LoggerProps) => {
    if (__DEV__) {
      console.log(
        `\n[${type.toLocaleUpperCase()}]: `, title, 
        data ? `\n[DATA]: ${JSON.stringify(data, null, 2)} \n` : '\n'
      );
    }
  };

  const logSuccessfulApi = ({ title, data }: LoggerProps) => log({
		type: 'info',
		title,
		data: {
      code: 200,
      message: 'Successful api call',
      ...data,
    }
	});

  const logErrorApi = ({ title, data }: LoggerProps) => log({
		type: 'error',
		title,
    data
	});

  const logErrorData = (error: AxiosErrorResponse) => ({
		code: error.code,
		message: error.message,
		response: error?.response?.data.error
	});

  return { log, logSuccessfulApi, logErrorApi, logErrorData };
};

export default useLogger;