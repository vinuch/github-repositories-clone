const fetch = require('node-fetch');
let data;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};
exports.handler = function(event, context, callback) {
  const baseUrl = 'https://api.github.com/graphql';
  const user = event.queryStringParameters.user
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.AUTH_TOKEN}`,
      },
      body:  JSON.stringify({ query:  `  {user(login: ${user}) {
        starredRepositories {
         totalCount
       }
       following {
         totalCount
       }
       followers {
         totalCount
       }
       avatarUrl
       bio
       email
       name
       location
       twitterUsername
       websiteUrl
       organizations {
         totalCount
       }
       repositories(last: 20) {
               nodes {
           name
           url
           description
           updatedAt
           isFork
           primaryLanguage {
             name
             color
           }
           isPrivate
         }
 }
}
}}`
        })
      })
      .then(response => response.json())
      .then(json => {
        data = json
        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify(data)
        })
      })
    };