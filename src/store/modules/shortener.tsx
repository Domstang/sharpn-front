import { baseURL } from '../../apiConfig';

export interface Sharpn {
  fullCreationDate: Date;
  creationDate: String;
  creationHour: String;
  longUrl: String;
  shortUrl: String;
  shortUrlId: String;
  userIpAdress: String;
}

export interface Action {
  type: string;
  sharpn?: Sharpn;
  ip?: string;
}

const initialState = {
  urls: []
};

export const sendUrlsToBack = (sharpn: Sharpn) => ({
  type: 'SEND_URLS_TO_BACK',
  sharpn
});

export const checkUserUrls = (ip: string) => ({
  type: 'FETCH_USER_URLS',
  ip
});

async function reducer(state = initialState, action: Action): Promise<{ urls: any[] }> {
  switch (action.type) {
    case 'SEND_URLS_TO_BACK':
      try {
        /* const response = */
        await fetch(baseURL + '/shorten', {
          method: 'POST',
          body: JSON.stringify({
            fullCreationDate: action.sharpn!.fullCreationDate,
            creationDate: action.sharpn!.creationDate,
            creationHour: action.sharpn!.creationHour,  
            longUrl: action.sharpn!.longUrl,
            shortUrl: action.sharpn!.shortUrl,
            shortUrlId: action.sharpn!.shortUrlId,
            userIpAdress: action.sharpn!.userIpAdress,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        //const data = await response.json();
      } catch (error) {
        console.error(error);
      }
      return {
        ...state
      };
    case 'FETCH_USER_URLS':
      try {
        const response = await fetch(baseURL + '/user-urls', {
          method: 'POST',
          body: JSON.stringify({
            userIpAdress: action.ip!
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        let docs = data.docs
        return {
          ...state,
          urls: docs
        };
      } catch (error) {
        console.error(error);
      }
      return {
        ...state
      };
    default:
      return state;
  }
}

export default reducer;
