import { useEffect, useRef, useState } from 'react';

const Autocomplete = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = initAutocomplete;
      document.body.appendChild(script);
    };

    const initAutocomplete = () => {
      const autocompleteService = new (window as any).google.maps.places.AutocompleteService();

      const autocompleteOptions = {
        types: ['geocode'], // You can specify additional types such as 'establishment' or 'address'
      };

      const autocomplete = new (window as any).google.maps.places.Autocomplete(inputRef.current, autocompleteOptions);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.formatted_address) {
          console.error('Invalid place');
          return;
        }

        console.log('Selected place:', place);
      });

      autocomplete.addListener('predictions_changed', () => {
        const newPredictions = autocomplete.getPlacePredictions();

        if (newPredictions) {
          setPredictions(newPredictions);
        }
      });
    };

    loadScript();
  }, []);

  return (
    <div className='border'>
      <input type="text" ref={inputRef} />
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>{prediction.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
