#[constructor=true,primary=path,db=memory]
struct Entrance{
    path: String,
    note: HashMap<String,String>,
}