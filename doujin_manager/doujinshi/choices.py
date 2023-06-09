DOUJIN_LANGUAGE_DEFAULT = None
DOUJIN_LANGUAGE_JAPANESE = "JAPANESE"
DOUJIN_LANGUAGE_CHINESE = "CHINESE"
DOUJIN_LANGUAGE_CHOICES = (
    (DOUJIN_LANGUAGE_DEFAULT, ""),
    (DOUJIN_LANGUAGE_JAPANESE, "Japanese"),
    (DOUJIN_LANGUAGE_CHINESE, "Chinese"),
)
DOUJIN_LANGUAGE_MAX_LEN = 8
assert DOUJIN_LANGUAGE_MAX_LEN >= max([len(c) for c, _ in DOUJIN_LANGUAGE_CHOICES if c])


CURRENCY_DEFAULT = None
CURRENCY_TWD = "TWD"
CURRENCY_JPY = "JPY"
CURRENCY_CHOICES = (
    (CURRENCY_DEFAULT, ""),
    (CURRENCY_TWD, "TWD"),
    (CURRENCY_JPY, "JPY"),
)
CURRENCY_MAX_LEN = 3
assert CURRENCY_MAX_LEN >= max([len(c) for c, _ in CURRENCY_CHOICES if c])
