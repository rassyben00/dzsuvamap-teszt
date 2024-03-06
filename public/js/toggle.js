async function toggleVisibility(id) {
    //const marker = markers.find(item => item.id === id);
    const checkbox = document.getElementById(`visibilityCheckbox${id}`);

    //marker.marker.setMap(checkbox.checked ? map : null);

     //Send a POST request to update visibility on the server
    await fetch('/updateVisibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, isVisible: checkbox.checked }),
    });
  }