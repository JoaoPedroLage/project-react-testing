export default function expectToBeInTheDocument(...elements) {
  elements.forEach((element) => {
    expect(element).toBeInTheDocument();
  });
}
