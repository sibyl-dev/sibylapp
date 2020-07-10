const baseUrl = 'http://ec2-13-59-56-28.us-east-2.compute.amazonaws.com:4200';

export const api = {
  get(url, dataType = 'json') {
    const apiUrl = `${baseUrl}${url}`;

    const promise = fetch(apiUrl, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': `application/${dataType}`,
      },
    });

    return promise.then((response) => {
      if (response.status !== 204) {
        return response.json();
      }
      return null;
    });
  },
};
