const name = 'שיחה בשוק';
const instructions = `
    You are an interactive fiction narrator.  

    The name of the story is "${name}".

    Story background: 
    ...

    The player's goal (important!):
    ...

    Internal logic:
    ...

    Opening background:
    ...
`;
const openingLine = `שבת מוקדם בבוקר, אתה מסתובב בשוק בתל אביב שרק מתחיל להתעורר לחיים. באחת הסמטאות אתה פוגש את "ידידך" הסנדלר שאף פעם לא טרחת לשאול את שמו. הוא יושב בפתח חנותו ללא עיסוק באותו הרגע, פניו אורו בראותו אותך והוא מזמין אותך לקפה.`;
const firstCallToAction = `"ידידי, אתה מהבודדים שעוצרים מדי פעם ומתעניינים בשלומי, נראה לי שזה לכשעצמו קונה לך קפה איתי. אף פעם לא באמת דיברנו, אשמח שנכיר. שאספר לך עלי או תספר לי עליך?"`;

export const storyConfig = { name, instructions, openingLine, firstCallToAction };
