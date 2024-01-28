import GlobalStorage from "./globalStorage";

describe('GlobalStorage settings.', () => {

  it('GlobalStorage VISIBLE_SYMBOLS not less then SYMBOLS_PER_REEL', () => {
    expect(GlobalStorage.configs.VISIBLE_SYMBOLS>=GlobalStorage.configs.SYMBOLS_PER_REEL).toBeFalse();
  });
});
