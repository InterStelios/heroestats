const fs = require('fs');
const JSSoup = require('jssoup').default;
const axios = require('axios');
const { withProjectPath } = require('./utils');

const uri = 'http://heroes.thelazy.net/wiki/List_of_creatures_(HotA)';

const defaultFormatter = value =>
  value
    .trim()
    .replace(/&#160;/g, '')
    .toLowerCase();

const defaultGetter = node => defaultFormatter(node.getText());

const createType = (
  name,
  getter = defaultGetter,
  formatter = defaultFormatter,
) => ({
  name,
  getter,
  formatter,
});

const stats = Object.assign({}, [
  createType('name', node => node.find('a').attrs.title),
  createType('town', node => node.find('span').attrs.title),
  createType('level'),
  createType('attack'),
  createType('defense'),
  createType('minimumDamage'),
  createType('maximumDamage'),
  createType('healthPoints'),
  createType('speed'),
  createType('growth'),
  createType('aiValue'),
  createType('cost'),
  createType('resourceCost'),
  createType('special'),
]);

const getCreaturesRows = soup => {
  const rows = soup.find('table').findAll('tr');
  // remove header row
  return rows.slice(1, rows.length);
};

const getAttributeCells = id => node =>
  Object.assign(
    {},
    node.findAll('td').reduce((prev, node, index) => {
      const { name, getter, formatter } = stats[index];
      return Object.assign({}, prev, {
        [name]: formatter(getter(node)),
      });
    }, {}),
    { id: id() },
  );
(async function rehydrate() {
  const id = ((i = 1) => () => i++)();
  const creaturesWikiPage = await axios.get(uri);
  const soup = new JSSoup(creaturesWikiPage.data).contents[1];
  const extracted = getCreaturesRows(soup).map(getAttributeCells(id));

  return fs.writeFileSync(
    withProjectPath('stats.json'),
    JSON.stringify(extracted, null, 2),
    'utf8',
  );
})();
