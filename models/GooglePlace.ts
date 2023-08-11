export type Place = {
    description: string;
    matched_substrings: Array<{
      length: number;
      offset: number;
    }>;
    place_id: string;
    reference: string;
    structured_formatting: {
      main_text: string;
      main_text_matched_substrings: Array<{
        length: number;
        offset: number;
      }>;
      secondary_text: string;
    };
    terms: Array<{
      offset: number;
      value: string;
    }>;
    types: Array<"point_of_interest" | "establishment">;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    photos: Array<{
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }>;
  };
  