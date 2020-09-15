export const defaults = {
  // 디폴트로 할 수 있는 쿼리
  notes: [
    {
      __typename: "Note", // apollo로 localState랑 일할 때는 이걸 꼭 써줘야해. 규칙.
      id: 1,
      title: "First",
      content: "Second",
    },
  ],
};
