fn main() {
    let life = 42;
    println!("{:?}", life);
    println!("{:?}", check_number(life));
}


fn check_number(a: i32) -> &str {
    if a > 0 {
        return "positive";
    } else if a < 0 {
        return "negative";
    } else {
        return "zero";
    }
}