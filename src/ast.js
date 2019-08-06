import _ from 'lodash';

const actions = [
  {
    type: 'tree',
    check: (key, obj1, obj2) => (
      _.has(obj1, key) && _.has(obj2, key)
      && _.isObject(obj1[key]) && _.isObject(obj2[key])
    ),
    process: (key, file1, file2, fn, depth) => (
      { children: fn(file1[key], file2[key], depth + 2) }
    ),
  },
  {
    type: 'unchanged',
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    process: (key, obj1, obj2) => ({ before: obj1[key], after: obj2[key] }),
  },
  {
    type: 'changed',
    check: (key, obj1, obj2) => (
      _.has(obj2, key) && _.has(obj1, key) && obj1[key] !== obj2[key]
    ),
    process: (key, obj1, obj2) => ({ before: obj1[key], after: obj2[key] }),
  },
  {
    type: 'removed',
    check: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    process: (key, obj1, obj2) => ({ before: obj1[key], after: obj2[key] }),
  },
  {
    type: 'added',
    check: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    process: (key, obj1, obj2) => ({ before: obj1[key], after: obj2[key] }),
  },
];

const getActionForAst = (key, file1, file2) => (
  actions.find(({ check }) => check(key, file1, file2))
);

const createAst = (obj1, obj2, depth = 2) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  return keys.map((key) => {
    const { type, process } = getActionForAst(key, obj1, obj2);
    const { before, after, children } = process(key, obj1, obj2, createAst, depth);
    return {
      type,
      key,
      before,
      after,
      children,
      depth,
    };
  });
};

export default createAst;
