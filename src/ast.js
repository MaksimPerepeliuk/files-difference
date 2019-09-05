import _ from 'lodash';

const actions = [
  {
    type: 'tree',
    check: (key, obj1, obj2) => (
      _.has(obj1, key) && _.has(obj2, key) && _.isObject(obj1[key]) && _.isObject(obj2[key])
    ),
    process: (key, obj1, obj2, fn) => (
      { children: fn(obj1[key], obj2[key]) }
    ),
  },
  {
    type: 'removed',
    check: (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key),
    process: (key, obj1, obj2) => ({ beforeValue: obj1[key], afterValue: obj2[key] }),
  },
  {
    type: 'added',
    check: (key, obj1, obj2) => !_.has(obj1, key) && _.has(obj2, key),
    process: (key, obj1, obj2) => ({ beforeValue: obj1[key], afterValue: obj2[key] }),
  },
  {
    type: 'changed',
    check: (key, obj1, obj2) => (
      _.has(obj2, key) && _.has(obj1, key) && obj1[key] !== obj2[key]
    ),
    process: (key, obj1, obj2) => ({ beforeValue: obj1[key], afterValue: obj2[key] }),
  },
  {
    type: 'unchanged',
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    process: (key, obj1, obj2) => ({ beforeValue: obj1[key], afterValue: obj2[key] }),
  },
];

const getActionForAst = (key, obj1, obj2) => (
  actions.find(({ check }) => check(key, obj1, obj2))
);

const buildAst = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  return keys.map((key) => {
    const { type, process } = getActionForAst(key, obj1, obj2);
    const { beforeValue, afterValue, children } = process(key, obj1, obj2, buildAst);
    return {
      type,
      key,
      beforeValue,
      afterValue,
      children,
    };
  });
};

export default buildAst;
