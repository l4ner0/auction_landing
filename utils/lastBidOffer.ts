export const getLastBidOffer = (bids: any[]): number => {
  const winnerBid = bids.find((bid: any) => bid.status === "WINNER");
  const winnerAmount = winnerBid ? winnerBid.amount : null;

  return winnerAmount;
};
