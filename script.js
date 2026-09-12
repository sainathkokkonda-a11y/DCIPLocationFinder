async function getIPData() {
  const inputIp = document.getElementById('ip-input').value.trim();
  const endpoint = inputIp ? `https://ipapi.co/${inputIp}/json/` : 'https://ipapi.co/json/';

  try {
    let response = await fetch(endpoint);
    let data = await response.json();

    if (!data.ip || data.error) {
      response = await fetch(`https://ipinfo.io/${inputIp || ''}/json`);
      data = await response.json();
      
      const loc = (data.loc || "0,0").split(',');
      data.latitude = loc[0];
      data.longitude = loc[1];
      data.country_name = data.country;
      data.org = data.org;
    }

    document.getElementById('res-ip').innerText = data.ip || 'N/A';
    document.getElementById('res-city').innerText = `${data.city || ''}, ${data.region || ''}`;
    document.getElementById('res-country').innerText = data.country_name || data.country || 'N/A';
    document.getElementById('res-isp').innerText = data.org || 'N/A';
    document.getElementById('res-tz').innerText = data.timezone || 'N/A';

    if (data.latitude && data.longitude) {
      document.getElementById('google-map').src = `https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=12&output=embed`;
    }
  } catch (err) {
    alert('Unable to load IP data.');
  }
}

// Load automatically on page visit
getIPData();
