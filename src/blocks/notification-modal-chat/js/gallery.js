import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';

let gallery = [];

const updateGallery = () => {
  const picturesNode = document.querySelectorAll('.notification-modal-chat__message-pictures');

  gallery.forEach((item) => item.destroy());
  gallery = [];

  picturesNode.forEach((pictureNode) => {
    gallery.push(lightGallery(pictureNode, {
      plugins: [lgZoom],
      speed: 300,
      mobileSettings: {
        download: false,
      },
    }))
  });
};

export { updateGallery };
