// 判断两个矩形是否相交

// 约定坐标系：x轴向右，y轴向下，矩形由左上角坐标(x, y)和宽高(width, height)定义
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x; // 矩形左上角的x坐标
    this.y = y; // 矩形左上角的y坐标
    this.width = width;
    this.height = height;
  }

  // 方法1（推荐）：如果一个矩形在另一个矩形的左边、右边、上边或下边，则它们不相交
  // 该实现将“仅边界接触”视为相交
  intersectsSimple(other) {
    return !(
      this.x + this.width < other.x ||
      other.x + other.width < this.x ||
      this.y + this.height < other.y ||
      other.y + other.height < this.y
    );
  }

  // 方法2：通过检查水平和垂直方向上的重叠来判断相交
  intersectsCurrent(other) {
    // 水平方向
    let isHorizontalOverlap =
      (this.x <= other.x + other.width && this.x >= other.x) ||
      (other.x <= this.x + this.width && other.x >= this.x);
    // 垂直方向
    let isVerticalOverlap =
      (this.y <= other.y + other.height && this.y >= other.y) ||
      (other.y <= this.y + this.height && other.y >= this.y);
    return isHorizontalOverlap && isVerticalOverlap;
  }

  // 默认接口：使用方法1
  intersects(other) {
    return this.intersectsSimple(other);
  }
}

function rect(x, y, width, height) {
  return new Rectangle(x, y, width, height);
}

function runCase(name, a, b) {
  const simple = a.intersectsSimple(b);
  const current = a.intersectsCurrent(b);
  const pass = simple === current;
  return {
    name,
    pass,
    simple,
    current,
    a,
    b,
  };
}

function runDeterministicTests() {
  const cases = [
    runCase("完全重合", rect(0, 0, 10, 10), rect(0, 0, 10, 10)),
    runCase("部分重叠", rect(0, 0, 10, 10), rect(5, 5, 10, 10)),
    runCase("A包含B", rect(0, 0, 20, 20), rect(5, 5, 3, 3)),
    runCase("B包含A", rect(5, 5, 3, 3), rect(0, 0, 20, 20)),
    runCase("左右分离", rect(0, 0, 10, 10), rect(11, 0, 10, 10)),
    runCase("上下分离", rect(0, 0, 10, 10), rect(0, 11, 10, 10)),
    runCase("刚好右边接触", rect(0, 0, 10, 10), rect(10, 2, 3, 3)),
    runCase("刚好下边接触", rect(0, 0, 10, 10), rect(2, 10, 3, 3)),
    runCase("仅角点接触", rect(0, 0, 10, 10), rect(10, 10, 4, 4)),
    runCase("负坐标重叠", rect(-10, -10, 8, 8), rect(-6, -6, 10, 10)),
    runCase("远距离分离", rect(-100, -100, 5, 5), rect(100, 100, 5, 5)),
    runCase("细长矩形重叠", rect(0, 0, 100, 1), rect(50, -1, 1, 5)),
    runCase("细长矩形接触边", rect(0, 0, 100, 1), rect(100, 0, 1, 1)),
  ];

  return cases;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function runRandomTests(count = 50000) {
  let mismatchCount = 0;
  let firstMismatch = null;

  for (let i = 0; i < count; i++) {
    const a = rect(
      randomInt(-50, 50),
      randomInt(-50, 50),
      randomInt(1, 30),
      randomInt(1, 30)
    );
    const b = rect(
      randomInt(-50, 50),
      randomInt(-50, 50),
      randomInt(1, 30),
      randomInt(1, 30)
    );

    const simple = a.intersectsSimple(b);
    const current = a.intersectsCurrent(b);

    if (simple !== current) {
      mismatchCount++;
      if (!firstMismatch) {
        firstMismatch = { a, b, simple, current };
      }
    }
  }

  return { count, mismatchCount, firstMismatch };
}

function main() {
  const deterministic = runDeterministicTests();
  const deterministicMismatch = deterministic.filter((item) => !item.pass);

  console.log("=== 固定用例测试 ===");
  console.log(`总数: ${deterministic.length}`);
  console.log(`不一致: ${deterministicMismatch.length}`);
  if (deterministicMismatch.length > 0) {
    console.log("示例不一致用例:");
    console.log(deterministicMismatch[0]);
  }

  console.log("\n=== 随机对拍测试 ===");
  const randomResult = runRandomTests(50000);
  console.log(`随机用例总数: ${randomResult.count}`);
  console.log(`不一致数量: ${randomResult.mismatchCount}`);
  if (randomResult.firstMismatch) {
    console.log("首个不一致样例:");
    console.log(randomResult.firstMismatch);
  }

  console.log("\n=== 结论 ===");
  if (deterministicMismatch.length === 0 && randomResult.mismatchCount === 0) {
    console.log("两种实现在当前测试范围内一致。");
  } else {
    console.log("两种实现并非始终一致，当前实现存在边界判定差异。");
  }
}

main();