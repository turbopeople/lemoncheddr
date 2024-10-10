(async function() {
  function copyText(str) {
  navigator.clipboard.writeText(str);
}

  const defaultList = [
                  {
                   "title": "Hello World",
                   "img": null,
                   "description": "An extension example",
                   "url": 'extensions/hello-world.js',
                   "creator": [
                     {"name": "GarboMuffin", "url": "https://scratch.mit.edu/users/GarboMuffin/"}
                   ]
                   }
  ];

  async function getList() {
    try {
      return await fetch('extensions.json')
        .then(response => response.json())
        .then(response => {
          return response
        })
    } catch (uselessError) {
      throw new Error('Failed to fetch!');
      return defaultList;
    }
  };
  
  let extList = await getList();

  const extensions = document.getElementById('extensions');

  extList.forEach(currentValue => {
    const extension = document.createElement('div');
    
    const title = document.createElement('h2');
    title.textContent = currentValue["title"];
    
    const img = document.createElement('img');
    if(!currentValue["img"] || currentValue["img"] == null) {
      img.src = "./images/unknown-banner.png"
    } else {
      img.src = currentValue["img"];
    }
    
    const description = document.createElement('p');
    description.classList.add('desc');
    description.textContent = currentValue["description"]
    
    extension.appendChild(img);
    extension.appendChild(title);
    extension.appendChild(description);
    
    const creators = currentValue["creator"];
    
    const creatorText = document.createElement('p');
    creatorText.textContent = `Creator(s):`
    
    extension.appendChild(creatorText);
    
    creators.forEach(currentValue => {
      const creator = document.createElement('a');
      creator.textContent = `${currentValue["name"]} `;
      creator.href = currentValue["url"] ? currentValue["url"] : '#' ;
      extension.appendChild(creator);
      extension.appendChild(document.createElement('br'));
      extension.appendChild(document.createElement('br'));
    })
    
    extension.classList.add('extension');
    
    const copyURLBtn = document.createElement('button');
    const copyCodeBtn = document.createElement('button');
    copyURLBtn.classList.add('extension-button');
    copyURLBtn.dataset.copy = 'url';
    copyCodeBtn.classList.add('extension-button');
    copyCodeBtn.dataset.copy = 'code';
    copyURLBtn.textContent = 'Copy URL';
    copyCodeBtn.textContent = 'Copy Code';
    
    const lineBreak = document.createElement('br');
    
    copyURLBtn.addEventListener('click', function() {
      copyText(`${window.location.href}/${currentValue['url']}`);
    })
    
    async function getCode() {
      try {
        return await fetch(currentValue['url'])
          .then(response => response.text())
          .then(response => {
            return response;
          })
      } catch (uselessError) {
        return 'Failed to fetch code!'
      }
    }
    
    copyCodeBtn.addEventListener('click', async function() {
      const code = await getCode()
      copyText(code);
    })
    
    extension.appendChild(lineBreak);
    
    extension.appendChild(copyURLBtn);
    extension.appendChild(copyCodeBtn);
    
    extensions.appendChild(extension);
});})()
