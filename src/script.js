window.onload = function() {
  let allVideos = localStorage.videos ? JSON.parse(localStorage.videos) : [];
  let videoElementsById = {};
  const url = 'https://www.googleapis.com/youtube/v3/search';
  const GOOGLE_API_KEY = 'AIzaSyCyNAJ68qjuzVcd9ruQFAmM8KzDwK6Wkf4';

  const input = document.createElement('input');
  input.className = 'youtube-input';
  document.body.appendChild(input);

  input.addEventListener('keyup', function(e) {
    let val = this.value;
    if (e.keyCode == 13) {
      if (document.querySelector('.container') != null || 0) {
        const remDiv = document.querySelector('.container');
        remDiv.remove();
      }

      fetch(`${url}?key=${GOOGLE_API_KEY}&type=video&part=snippet&maxResults=4&q=${input.value}`)
        .then(response => response.json())
        .then(showVideos);

      function showVideos(videos) {
        localStorage.videos = JSON.stringify(videos);
        allVideos = videos;

        let vid = allVideos['items'];
        const cardDiv = document.createElement('div');
        cardDiv.className = 'container';

        for (var i = 0; i < vid.length; i++) {
          const card = document.createElement('div');
          card.className = 'cards';

          const title = document.createElement('div');
          title.className = 'card-title';

          const link = document.createElement('a');
          link.setAttribute('target', '_blank');
          link.href = `https://www.youtube.com/watch?v=${vid[i].id.videoId}`;
          link.textContent = vid[i].snippet.title;
          link.className = 'card-name'

          const img = document.createElement('img');

          const imageRes = vid[i].snippet.thumbnails.medium;

          img.src = imageRes.url;
          img.className = 'card-img';

          //const iUser = document.createElement('i');
          //iUser.innerHTML = '<i class="fa fa-user" aria-hidden="true"></i>';

          //const iDate = document.createElement('i');
          //iDate.innerHTML = '<i class="fa fa-calendar" aria-hidden="true"></i>';

          //const iViews = document.createElement('i');
          //iViews.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i>';

          const author = document.createElement('h5');
          author.className = 'card-text';
          author.textContent = `Author: ${vid[i].snippet.channelTitle}`;

          const date = document.createElement('h5');
          date.className = 'card-text';
          date.textContent = `Date: ${vid[i].snippet.publishedAt.substring(0,10)}`;

          const views = document.createElement('h5');
          views.className = 'card-text';
          //views.textContent = `Views: ${vid[i].statistics.viewCount}`;

          const desc = document.createElement('p');
          desc.className = 'card-desc';
          desc.textContent = `${vid[i].snippet.description}`;

          //author.appendChild(iUser);
          //date.appendChild(iDate);
          //views.appendChild(iViews);



          title.appendChild(link);
          card.appendChild(title);
          card.appendChild(img);
          card.appendChild(author);

          card.appendChild(date);
          card.appendChild(views);
          card.appendChild(desc);



          cardDiv.appendChild(card);



        }
        //carousel
        const carouselDiv = document.createElement('div');
        carouselDiv.className = 'carousel';


        const carouselPoint = document.createElement('div');
        carouselPoint.className = 'carousel-point';

        carouselDiv.appendChild(carouselPoint);
        cardDiv.appendChild(carouselDiv);
        //end of carousel
        document.body.appendChild(cardDiv);
      }
    }
  });


};
