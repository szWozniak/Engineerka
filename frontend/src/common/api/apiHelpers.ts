export const defaultURL = "http://localhost:8080"

export const checkForErrors = (res: Response) => {
    if (res.status !== 200) {
      throw res;
    }
  
    return res;
  }
