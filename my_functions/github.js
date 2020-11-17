const fetch = require('node-fetch');
let data;
exports.handler = function(event, context, callback) {
  const baseUrl = 'https://api.github.com/graphql';
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${process.env.AUTH_TOKEN}`,
      },
      body:  JSON.stringify({ query:  `{ viewer {     login
          starredRepositories {
            totalCount
          }
          following {
            totalCount
          }
          followers {
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
          avatarUrl
          bio
          email
          name
          location
          twitterUsername
          websiteUrl
          organizations {
            totalCount
          } }}`
        })
      
    })
      .then(response => response.json())
      .then(json => {
        data = json
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(data)
        })
      })
    };