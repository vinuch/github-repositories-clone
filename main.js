
  const params = new URLSearchParams(window.location.search)
  console.log(params)
  fetch(`https://gh-repositoriesclone.netlify.app/.netlify/functions/github/?user=${params.get('user')}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let resultObject = data.data.user
    document.querySelector('.avatar-big').src = resultObject.avatarUrl
    document.querySelector('.avatar-small').src = resultObject.avatarUrl
    document.querySelector('.bio-text').innerText = resultObject.bio
    document.querySelector('#username').innerText = resultObject.login
    document.querySelector('.name').innerText = resultObject.name
    document.querySelector('#followers').innerText = resultObject.followers.totalCount + ' Followers'
    document.querySelector('#following').innerText = resultObject.following.totalCount + ' Following'
    document.querySelector('#stared').innerText = resultObject.starredRepositories.totalCount
    document.querySelector('#location').innerText = resultObject.location
    document.querySelector('#email').innerText = resultObject.email
    document.querySelector('#email').href = resultObject.email
    document.querySelector('#website').innerText = resultObject.websiteUrl
    document.querySelector('#website').href = resultObject.websiteUrl
    document.querySelector('#twitter').innerText = resultObject.twitterUsername
    resultObject.repositories.nodes.forEach(element => {
      // console.log(element)
      let repository = document.createElement('div')
      repository.className = 'repo'
      repository.innerHTML = `
      <div class="flex justify-between items-center">
        <a href="${element.url}"><h2 class="repo-name">
          ${element.name}
        </h2>
        ${element.isPrivate ? '<span class="private-label">Private</span>' : ''}
        </a>
      
        <button class="flex justify-between items-center"><img width="15px" src="assets/star.svg" alt=""> <p>star</p></button>
      </div>
      <p>${element.description ? element.description : ''}</p>
      <div class="flex repo-meta">
          <div>
            <span class="language-color" style="background-color: ${element.primaryLanguage ? element.primaryLanguage.color : ''}"></span>
            <span>${element.primaryLanguage ? element.primaryLanguage.name : ''}</span>
          </div>
          <span>Updated 14 Days ago </span>
        </div>
    `
    document.querySelector('.repos').appendChild(repository);

    });
  })

