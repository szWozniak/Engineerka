export const defaultURL = "http://dronhub.pl:8080"

export const checkForErrors = (res: Response) => {
    if (res.status !== 200) {
      throw res;
    }
  
    return res;
  }