export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

// Sample hierarchical data for Telangana (for demonstration)
// Structure: { State: { District: { Mandal: [Villages] } } }
export const STATE_DATA = {
  "Telangana": {
    "Hyderabad": {
      "Ameerpet": ["Ameerpet Village", "SR Nagar", "Punjagutta"],
      "Khairatabad": ["Khairatabad Village", "Somajiguda", "Raj Bhavan"],
      "Secunderabad": ["Secunderabad City", "Tarnaka", "Mettuguda"]
    },
    "Ranga Reddy": {
      "Serilingampally": ["Gachibowli", "Madhapur", "Kondapur", "Miyapur"],
      "Rajendranagar": ["Attapur", "Budvel", "Rajendranagar Village"],
      "Shamshabad": ["Shamshabad Village", "Airport Area", "Palmakole"]
    },
    "Medchal-Malkajgiri": {
      "Kukatpally": ["KPHB Colony", "Moosapet", "Balanagar"],
      "Malkajgiri": ["Malkajgiri Village", "Safilguda", "Neredmet"],
      "Quthbullapur": ["Jeedimetla", "Suraram", "Gajularamaram"]
    },
    "Mahabubnagar": {
      "Mahabubnagar (Urban)": ["Mahabubnagar Town", "Yenugonda", "Boyapalle"],
      "Jadcherla": ["Jadcherla Town", "Badepalle", "Gollapalle"],
      "Bhoothpur": ["Bhoothpur Village", "Amistapur", "Sheripally"]
    }
  },
  "Andhra Pradesh": {
    "Visakhapatnam": {
      "Bheemunipatnam": ["Bheemili", "Kapuluppada"],
      "Anandapuram": ["Anandapuram Village", "Sontyam"]
    }
  }
};
