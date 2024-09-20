"use client";

import React, { useEffect, useState } from "react";

const Tracking = () => {
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    // Fetch bus data from JSON file
    const fetchBusData = async () => {
      const response = await fetch("/busData.json");
      const data = await response.json();
      setBusData(data);
    };

    fetchBusData();
  }, []);

  useEffect(() => {
    const loadHereMaps = () => {
      const script = document.createElement("script");
      script.src = `https://js.api.here.com/v3/3.1/mapsjs-core.js`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const scriptService = document.createElement("script");
        scriptService.src = "https://js.api.here.com/v3/3.1/mapsjs-service.js";
        scriptService.async = true;
        scriptService.defer = true;
        scriptService.onload = () => {
          const scriptEvents = document.createElement("script");
          scriptEvents.src =
            "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js";
          scriptEvents.async = true;
          scriptEvents.defer = true;
          scriptEvents.onload = () => {
            const scriptUi = document.createElement("script");
            scriptUi.src = "https://js.api.here.com/v3/3.1/mapsjs-ui.js";
            scriptUi.async = true;
            scriptUi.defer = true;
            scriptUi.onload = () => {
              initMap(); // Call function to initialize map after loading SDK
            };
            document.body.appendChild(scriptUi);
          };
          document.body.appendChild(scriptEvents);
        };
        document.body.appendChild(scriptService);
      };
      document.body.appendChild(script);
    };

    const initMap = () => {
      const platform = new H.service.Platform({
        apikey: process.env.NEXT_PUBLIC_HERE_API_KEY,
      });
      const defaultLayers = platform.createDefaultLayers();

      const map = new H.Map(
        document.getElementById("mapContainer"),
        defaultLayers.vector.normal.map,
        {
          center: { lat: 19.076, lng: 72.8777 },
          zoom: 13,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );

      window.addEventListener("resize", () => map.getViewPort().resize());
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      // Add markers and routes for each bus from fetched data
      busData.forEach((bus) => {
        const marker = new H.map.Marker(bus.coordinates);
        map.addObject(marker);

        // Create a LineString for the bus route
        const routeLine = new H.geo.LineString();
        bus.routeCoordinates.forEach((point) => {
          routeLine.pushLatLngAlt(point.lat, point.lng);
        });

        const polyline = new H.map.Polyline(routeLine, {
          style: { strokeColor: "blue", lineWidth: 5 },
        });
        map.addObject(polyline);

        // Add info bubble for each bus
        const infoBubble = new H.ui.InfoBubble(bus.coordinates, {
          content: `<strong>${bus.bus_id}</strong><br/>Route: ${bus.route}<br/>Status: ${bus.status}<br/>Timing: ${bus.timing}`,
        });
        ui.addBubble(infoBubble);
      });
    };

    loadHereMaps();
  }, [busData]);

  return (
    <div>
      <h1>Campus Bus Tracking System</h1>
      <div id="mapContainer" style={{ height: "500px", width: "100%" }}></div>
    </div>
  );
};

export default Tracking;
