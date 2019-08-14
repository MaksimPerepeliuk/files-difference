import _ from 'lodash';

const actions = [
  {
    type: 'tree',
    check: (key, obj1, obj2) => (
      _.has(obj1, key) && _.has(obj2, key) && _.isObject(obj1[key]) && _.isObject(obj2[key])
    ),
    process: (key, obj1, obj2, fn, depth, parents) => (
      { children: fn(obj1[key], obj2[key], depth + 1, [...parents, key]) }
    ),
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
  {
    type: 'changed',
    check: (key, obj1, obj2) => (
      _.has(obj2, key) && _.has(obj1, key) && obj1[key] !== obj2[key]
    ),
    process: (key, obj1, obj2) => ({ before: obj1[key], after: obj2[key] }),
  },
  {
    type: 'unchanged',
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    process: (key, obj1, obj2) => ({ before: obj1[key], after: obj2[key] }),
  },
];

const getActionForAst = (key, obj1, obj2) => (
  actions.find(({ check }) => check(key, obj1, obj2))
);

const buildAst = (obj1, obj2, depth = 1, parents = []) => {
  const keys = _.uniq([...Object.keys(obj1), ...Object.keys(obj2)]);
  return keys.map((key) => {
    const { type, process } = getActionForAst(key, obj1, obj2);
    const { before, after, children } = process(key, obj1, obj2, buildAst, depth, parents);
    return {
      type,
      key,
      before,
      after,
      children,
      depth,
      parents,
    };
  });
};

export default buildAst;
