export type Document = {
  fileName: string;
  extension: string;
  content: string;
};

/* <Select
                  variant="filled"
                  placeholder="Choose Language"
                  w="40%"
                  onChange={(e) => handleType(e)}
                >
                  {languagesList.map((language) => (
                    <option
                      value={language.name}
                      key={language.id}
                      onChange={(e) => setType(e.currentTarget.value)}
                    >
                      {language.name}
                    </option>
                  ))}
                </Select> */
