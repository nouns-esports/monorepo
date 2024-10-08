export function roles(environment: "development" | "production"): {
  ranks: {
    [key: number]: string;
  };
  staff: string;
} {
  if (environment === "development") {
    return {
      ranks: {
        1: "1253532214784819240", // Explorer I
        2: "1253778440100909118", // Explorer II
        3: "1253778462511202365", // Explorer III
        4: "1292849974232485973", // Challenger I
        5: "1292849978930233355", // Challenger II
        6: "1292849981371318313", // Challenger III
        7: "1292849984428969995", // Champion I
        8: "1292849987188822036", // Champion II
        9: "1292849990086955058", // Champion III
      },
      staff: "1292850310515003493",
    };
  }

  return {
    ranks: {
      1: "1292850459672838144", // Explorer I
      2: "1292850515465601056", // Explorer II
      3: "1292850519181889590", // Explorer III
      4: "1292850522855833682", // Challenger I
      5: "1292850525380804629", // Challenger II
      6: "1292850528266616903", // Challenger III
      7: "1292850531479588967", // Champion I
      8: "1292850534327521300", // Champion II
      9: "1292850537292759051", // Champion III
    },
    staff: "1186404392346325173",
  };
}
